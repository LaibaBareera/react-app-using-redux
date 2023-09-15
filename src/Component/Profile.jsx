import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [item,setItem] = useState([]);
 
 const [Post,setPost] = useState([])
    const getPostData = async()=>{
const post = await fetch(`https://jsonplaceholder.typicode.com/posts`,{
  method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
});
const postList = await post.json();

    // Filter posts where userId === id
    const filteredPosts = postList.filter((post) => post.userId === parseInt(item.id));
    const filters = filteredPosts.slice(0,4);

    setPost(filters);

    }
    useEffect(()=>{
       
        const token = localStorage.getItem('item');
        const itm = JSON.parse(token);
        setItem(itm);
       
    },[])
    useEffect(()=>{
      getPostData();
    },[item])

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{item.name}</MDBTypography>
                  <MDBCardText>{item.address?.city}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">10</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Posts</MDBCardText>
                  </div>
                
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1"><span style={{fontWeight:'bolder'}}>Email: </span>{item.email}</MDBCardText>
                    <MDBCardText className="font-italic mb-1"><span style={{fontWeight:'bolder'}}>Website: </span>{item.website}</MDBCardText>
                    <MDBCardText className="font-italic mb-0"><span style={{fontWeight:'bolder'}}>Phone: </span>{item.phone}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent posts</MDBCardText>
                  <MDBCardText className="mb-0"><Link to={`/mypost/${item.id}`} className="text-muted">Show all</Link></MDBCardText>
                </div>
                <MDBRow>
                {Post.map((val)=>(
                  <MDBCol className="mb-2" key={val.id}>
                <div className='card' style={{objectFit:'contain',height:'100%',width:'250px',backgroundColor:'#fff',display:'flex',alignItems:'center'}}>
                  <h3 style={{fontSize:'1.1rem',fontWeight:'700'}}>{val.title}</h3>

                  <p style={{justifyContent:'space-evenly'}}>{val.body}</p>
                  </div>
                  </MDBCol>
                  
                ))}
                
                    
                 
                
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}