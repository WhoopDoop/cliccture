import './App.css';
import SearchIcon from './search.svg';
import {useState, useEffect, useRef} from 'react';
import Pic from './Pic';
import ModalImp from './ModalImp';

function App() {

  const loaderRef = useRef();
  const ACCESS_KEY = 'RNdOZK_-flEta9iXZiGclYPgP22eCidJFGKjZ94tnUo';
  const [pics, setPics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const searchPics = async(title, PageNum=1) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${title}&page=${PageNum}&per_page=20&client_id=${ACCESS_KEY}`);
    const data = await response.json();
    if (PageNum===1) {
      setPics(data.results || []);
    }
    else {
      setPics(prev => [...prev,...(data.results || [])]);
    }
  }
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setPage(1);
      searchPics(searchTerm, 1);
    }
  }, [searchTerm]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage(prev => prev+1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
  if (page > 1 && searchTerm.trim() !== "") {
    searchPics(searchTerm, page);
  }
  }, [page, searchTerm]); 
  
  return (
    <div className="app">
      <div>
        <h1 className="heading">CLICCTURE </h1>
      </div>
      <div className="search">
        <input
          placeholder="Enter your search."
          onChange = {(e) => setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt="DESCRIPTION" onClick = {() => searchPics(searchTerm)}></img>
      </div>
      {
                pics.length > 0
                ? (
                    <div className='container'>
                        {pics.map((picture) => (
                            <Pic picture = {picture}
                            onClick={() => setSelectedImage(picture)}/>
                    ))}
                    </div>
                    
                ) : (
                    <div>
                        <h2>COULD NOT FIND ANY PICTURES </h2>
                    </div>
                )
      }
      <div ref={loaderRef} style={{height: "30px"}} />

      {selectedImage && (
            <div onClick={() => setSelectedImage(null)}>
              <ModalImp image={selectedImage}/>
            </div>
        )}
    </div>
  );
}

export default App;
