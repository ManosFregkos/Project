import React,{useState,useEffect} from 'react';
import SinglePage from './SinglePage'
import moment from 'moment'

const PagesList = (props) => {



  const [allPages,setAllPages] = useState([]);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [type,setType] = useState('');
  const [isActive,setIsActive] = useState(false);
  const [publishedOn,setPublishedOn] = useState('');


  const createNewPage = (e) => {
    e.preventDefault();
    fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:title, description:description ,type:type ,isActive:isActive, publishedOn:publishedOn})
    })
    .then(res=>   {
        fetchData();    //fetching data before the button finish 
        setTitle('');
        setDescription('');
        setType('');
        setIsActive(false);
        setPublishedOn(false);
        })   //
    }

const onChangeActive = () => {
    setIsActive(!isActive)
  }
  
  const onChangePublish = () => {
    setPublishedOn(moment().format("DD-MM-YYYY hh:mm:ss"))
  }


const fetchData = () => {
  fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages")
  .then(response =>  response.json())
  .then(data => {
    setAllPages(data)
    props.defineAllPages(allPages)})  //child props to parent
  .catch(e => console.log(e))
}

  useEffect(() => {
    if (!allPages.length) {
      fetchData();
    }
  }, [])

    return (
       <div className="row row-cols-1 row-cols-md-3 g-4">
              <div style={{'width':'100%'}} className="col">
                <div className="card">
                    <form onSubmit={createNewPage}>
                        <div className="mb-3">
                            <label  className="form-label">Page Title</label>
                            <input 
                            onChange={e=>{setTitle(e.target.value)}} 
                            value={title} 
                            className="form-control input" 
                            id="exampleInputEmail1" 
                            placeholder="Give a page"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description Of Page</label>
                            <input 
                            onChange={e=>{setDescription(e.target.value)}} 
                            value={description} 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Give a small description"/>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" onChange={e => {setType(e.target.value)}} value={type} aria-label="Default select example">
                            <option defaultValue value="">Please Select the Type of the Site : </option>
                            <option value="0">0 - Responsive page that shows the Menu</option>
                            <option value="1">1 - Responsive page for the Events</option>
                            <option value="2">2 - Responsive page for general content</option>
                            </select>
                        </div>
                        <div className="mb-3 form-check">
                            <input 
                            type="checkbox" 
                            className="form-check-input" 
                            value={isActive} 
                            onChange={onChangeActive} 
                            id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check For Active Page</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input 
                            type="checkbox" 
                            className="form-check-input" 
                            value={publishedOn} 
                            onChange={onChangePublish} 
                            id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check For Current Date</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
          </div>  
          {props.allPages.map((page,i) => (
            <SinglePage key={i} allPages={props.allPages} fetchData={props.fetchData} id={page.id} title={page.title} description={page.description} type={page.type} isActive={page.isActive} publishedOn={page.publishedOn}/>
          ))}
        </div>
    )
}

export default PagesList;