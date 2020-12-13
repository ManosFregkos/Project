import './App.css';
import PagesList from './components/PagesList.jsx'
import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import SingleIdPage from './components/SingleIdPage.jsx'

const App = (props) => {
  const [allPages, setAllPages] = useState([]);
  
  const fetchData = () => {
  console.log("we are in fetch data ")
  fetch("https://pagesmanagement.azurewebsites.net/api/ResponsivePages")
  .then(response =>  response.json())
  .then(data => setAllPages(data))
  .catch(e => console.log(e))
}

  useEffect(() => {
    if (!allPages.length) {
      fetchData();
    }
  }, [])

  const defineAllPages = (allPages) => {   //set the child props in app js
    setAllPages(allPages)
  }
  

  return (
    
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <h1 style={{textAlign:"center"}}>DashBoard Of Our Pages</h1>
      <Router>
        <Switch>
          <Route exact path='/'   render={(props) => (<PagesList defineAllPages={defineAllPages} fetchData={fetchData} allPages={allPages}/>)}  />
          <Route path='/:id/prod/:title/:description/:type/:isActive/:publishedOn'  
          // render={(props) => {
            // let pageLocation = props.location.pathname.replace('/prod/:title/:description/:type/:isActive/:publishedOn',''); return (<SingleIdPage allPages={props.allPages[pageLocation]}/>)}} 
          component={SingleIdPage}/> 

        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
