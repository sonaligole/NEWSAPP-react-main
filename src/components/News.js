import React, {useEffect,useLayoutEffect,useState, useSyncExternalStore} from 'react'
import NewsItems from './NewsItems'
import Sppiner from './Sppiner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=> {
  const [articles,setArticles] = useState([]);
  const [loading,setLoding] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const UpdateNews = async (pageNo)=> {
    // // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=8d82cdfdc7fb4c61ab9c306d65f107db&page=${page}&pageSize=${props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c7176e71e3d144cbb116b43aa310f401&page=${page}&pageSize=${props.pageSize}`;
    setLoding(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    // setArticles(parsedData.articles)
    setArticles((prevArticles) => {
      if (prevArticles) {
        return prevArticles.concat(parsedData.articles);
      } else {
        return parsedData.articles;
      }
    });   
    setTotalResults(parsedData.totalResults)
    setLoding(false)
    
    // try {
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae0b831e88f247619626e60fbdea398b&page=${page}&pageSize=${props.pageSize}`;
    //   setLoading(true);
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // setArticles(parsedData.articles);
    //   setArticles((prevArticles) => {
    //     if (prevArticles && prevArticles.length){
    //       return prevArticles.concat(parsedData.articles);
    //     } else {
    //       return parsedData.articles;
    //     }
    //   });
    //   setTotalResults(parsedData.totalResults);
    //   setLoading(false);
    // } catch (error) {
    //   console.error('Error fetching news:', error);
    //   // Handle error state or display an error message
    //   setLoading(false); // Ensure loading state is set to false
    // }

    // try {
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae0b831e88f247619626e60fbdea398b&page=${page}&pageSize=${props.pageSize}`;
    //   let data = await fetch(url);
    //   if (!data.ok) {
    //     throw new Error(`HTTP error! Status: ${data.status}`);
    //   }
    //   let parsedData = await data.json();
    
    //   if (parsedData && parsedData.articles && parsedData.totalResults) {
    //     // Use parsedData.articles and parsedData.totalResults
    //     setArticles((prevArticles) => {
    //       if (prevArticles && prevArticles.length) {
    //         return prevArticles.concat(parsedData.articles);
    //       } else {
    //         return parsedData.articles;
    //       }
    //     });
    //     setTotalResults(parsedData.totalResults);
    //   } else {
    //     throw new Error('Invalid API response! Missing articles or totalResults.');
    //   }
    // } catch (error) {
    //   console.error('Error fetching news:', error);
    //   // Handle error state or display an error message
    //   setLoading(false); // Ensure loading state is set to false
    // }
  }
  //useeffect also done same work like componenet did mount doing
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewApp`;
    UpdateNews();
    //eslint-disable-next-line
  },[])

  //its a lifecyclemethod-  render k baad run hoga
  //async fun apni body k andat wait kr sakta h kuch promise k resolve hone ka
  // async componentDidMount() {
    // componentDidMount ye run hoga or api se latest news layega --- saare news ko update kr sakte h due to this
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=8d82cdfdc7fb4c61ab9c306d65f107db&page=1&pageSize=${props.pageSize}`;
    // setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // setState({
    //   articles: parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })
    // UpdateNews();
  // }
  const handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=8d82cdfdc7fb4c61ab9c306d65f107db&page=${page - 1}&pageSize=${props.pageSize}`;
    // setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    //  setState({
    //   page:page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    //  })
    setPage(page-1)
    UpdateNews();
  }
  const handleNextClick = async () => {
    // Math.ceil-kitne number of pages hoge or kitne number of pages chahiye hamre saare results ko
    // if(!(page+1>Math.ceil(totalResults/props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=8d82cdfdc7fb4c61ab9c306d65f107db&page=${page + 1}&pageSize=${props.pageSize}`;
    //   setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   setState({
    //     page:page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // }
    setPage(page+1)
    UpdateNews(); 
  }

  const fetchMoreData = async () => {
    
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=8d82cdfdc7fb4c61ab9c306d65f107db&page=${page+1}&pageSize=${props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c7176e71e3d144cbb116b43aa310f401&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    // setArticles(articles.concat(parsedData.articles))
    setArticles((prevArticles) => {
      if (prevArticles && prevArticles.length){
        return prevArticles.concat(parsedData.articles);
      } else {
        return parsedData.articles;
      }
    });
    setTotalResults(parsedData.totalResults)
  };

  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px' , marginTop:'90px'}} >DNA - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Sppiner/>} 
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Sppiner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url} >
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                    source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.PropType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
