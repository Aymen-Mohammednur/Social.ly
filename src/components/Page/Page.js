import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePages } from '../../hooks/usePages';
import Avatar from "@mui/material/Avatar"
import { storage } from "../../shared/service/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";


function Page() {
  const { id } = useParams();
  const [page, setPage] = useState();
  const [photoURL, setPhotoURL] = useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=");
  const { authUser } = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)


  const pages = usePages(authUser?.uid);

  useEffect(() => {
    if (id && pages) {
      setPage(pages.find(p => p.id === id));
    }
  }, [id, pages]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const imageRef = ref(storage, authUser.uid)
    setLoading(true)
    const snapshot = await uploadBytes(imageRef, image)
    const URL = await getDownloadURL(imageRef)
    updateProfile(authUser, { photoURL: URL })
    setLoading(false)
    alert("Uploaded image!")
  };

  useEffect(() => {
    if (authUser?.photoURL) {
      setPhotoURL(authUser.photoURL)
    }

  }, [authUser])

  return (
    <div className={styles.main}>
      <h1>{page?.name}</h1>

      <div className='d-flex justify-content-center mb-4'>
        <Avatar src={photoURL} sx={{ width: 150, height: 150 }} />
      </div>
      <div className="mb-2">
        <input type="file" onChange={handleImageChange} />
        <button disabled={loading || !image} onClick={handleSubmit}>Upload</button>
      </div>

      {page?.links?.map((l, index) => {
        console.log(l.value);
        return (
          <div
            onClick={() => window.open(l.value)}
            key={index}
            className={styles.page}
          >
            {l.name}
          </div>
        );
      })}
    </div>
  )
}

export default Page