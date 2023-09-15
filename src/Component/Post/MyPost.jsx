import React,{useState,useEffect} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBCardTitle } from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';
function MyPost(props) {
    const {id} = useParams();
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
            const filteredPosts = postList.filter((post) => post.userId === parseInt(id));
            setPost(filteredPosts);
        
            }
            useEffect(()=>{
                getPostData();
            },[])

    return (
       <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
            <MDBCardTitle>My Posts</MDBCardTitle>
              <MDBCardBody className="text-black p-4">
                
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

export default MyPost;