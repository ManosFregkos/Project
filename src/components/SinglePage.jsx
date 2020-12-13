import React from 'react';
import {Link} from 'react-router-dom'

const SinglePage = (props) => {

    const deleteData = () => {
        fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages/" + props.id, {
                            method: 'DELETE',
                            })
                            .then(res => {
                                props.fetchData();
                            })   
    }

    return (
        <div className="col">
            <div className="card">
                <img src="https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/gray-background-7131-96d780fd18d4eaf58a7331d45573204e@1x.jpg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">{props.title}</p>
                    <p className="card-text">{props.description}</p>
                    
                    <button className="btn btn-primary" type="sumbit" onClick={deleteData} >Delete Page  </button> 
                    <Link to={`/${props.id}/prod/${props.title}/${props.description}/${props.isActive}/${props.type}/${props.publishedOn}`}>
                    <button className="btn btn-primary">Edit Page</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SinglePage;