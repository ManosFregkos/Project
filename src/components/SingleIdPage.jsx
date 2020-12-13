import React,{useState} from 'react';
import moment from 'moment'

const SingleIdPage = (props) => {

    const [title,setTitle] = useState(props.match.params.title);
    const [description,setDescription] = useState(props.match.params.description);
    const [type,setType] = useState(props.match.params.type);
    const [isActive,setIsActive] = useState(false);
    const [publishedOn,setPublishedOn] = useState(props.match.params.publishedOn);
  
    const onChangeActive = () => {
        setIsActive(!isActive)
      }
      
      const onChangePublish = () => {
        setPublishedOn(moment().format("DD-MM-YYYY hh:mm:ss"))
      }

    const editData = (e) => {
        e.preventDefault();
        fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages/" + props.match.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:props.match.params.id ,title:title, description:description ,type:type ,isActive:isActive, publishedOn:publishedOn})
        })
        .then(res=>   {})

    }
    return (
        
        <div className="col">
            <div className="card">
                <img src="https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/gray-background-7131-96d780fd18d4eaf58a7331d45573204e@1x.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">You are on Page With :  {props.match.params.id} ID</h5>
                    <p className="card-text">Titlos einai :{title}</p>
                    <p className="card-text">To descriptin einai :{description}</p>
                    <p className="card-text">{type}</p>
                    <p className="card-text">{isActive}</p>
                    <p className="card-text">{publishedOn}</p>
                    <button type="submit" className="btn btn-primary" onClick={()=> props.history.push("/")} >Back To HomePage</button>
    

                        <div style={{'width':'100%'}} className="col">
                            <div className="card">
                                <form onSubmit={editData}>
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
                </div>
            </div>
        </div>
    )
}

export default SingleIdPage;