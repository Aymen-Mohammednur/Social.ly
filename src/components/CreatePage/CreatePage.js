import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { MdAdd, MdClose } from 'react-icons/md';
import { uuid } from '../../shared/helpers';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { db } from '../../shared/service/firebase';
import { useAuth } from '../../hooks/useAuth';
import { doc, addDoc, getDoc, collection, updateDoc } from "firebase/firestore";


function CreatePage() {
  const navigate = useNavigate();

  const { authUser } = useAuth();

  const { id } = useParams();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState();
  const [pageName, setPageName] = useState('');
  const [pageLinks, setPageLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState({
    value: '',
    name: '',
    id: '',
  });

  useEffect(() => {
    if (id && location.pathname.includes('/edit-page')) {
      setIsEdit(true)
      getDoc(doc(db, "linkPages", id)).then(res => {
        const data = res.data()
        if (data) {
          setPageName(data.name);
          setPageLinks(data.links);
        } else {
          console.error(404);
        }
      })
    } else {
      setIsEdit(false)
    }
  }, [id, location])

  const createPage = () => {
    if (authUser && pageName && pageLinks.length) {
      addDoc(collection(db, "linkPages"), {
        userId: authUser.uid,
        links: pageLinks,
        name: pageName,
      })
        .then(() => {
          navigate('/')
        })
    }
  };

  const updatePage = () => {
    if (authUser && pageName && pageLinks.length) {
      updateDoc(doc(db, "linkPages", id), {
        links: pageLinks,
        name: pageName,
      })
        .then(() => {
          navigate('/')
        })
    }
  }

  return (
    typeof isEdit === 'boolean' ?
      <div className={styles.main}>
        <input placeholder="Page Name" value={pageName}
          onChange={e => setPageName(e.target.value)}
          className={styles.name}
        />

        <div className={styles.links}>
          {pageLinks.map((l, index) => {
            return (
              <div key={index} className={styles.link}>
                <div className={styles.linkName}>{l.name}</div>
                <div className={styles.linkValue}>{l.value}</div>

                <div className={styles.deleteLink} onClick={() => setPageLinks(pageLinks.filter(pl => pl.id !== l.id))}>
                  <MdClose />
                </div>
              </div>
            );
          })}

          <div className={styles.linkInputs}>
            <input
              placeholder='Link Name'
              className={styles.currentLinkName}
              value={currentLink.name}
              onChange={e => setCurrentLink({ ...currentLink, name: e.target.value })} />
            <input
              placeholder='Link URL'
              className={styles.currentLinkValue}
              value={currentLink.value}
              onChange={e => setCurrentLink({ ...currentLink, value: e.target.value })} />

            <button
              onClick={() => {
                setPageLinks([
                  ...pageLinks,
                  {
                    name: currentLink.name,
                    value: currentLink.value,
                    id: uuid(),
                  },
                ]);
                setCurrentLink({ value: '', name: '', id: '' });
              }}
              disabled={!currentLink.name || !currentLink.value}
              className={styles.add}
            >
              <MdAdd />
            </button>
          </div>

        </div>

        <button
          onClick={isEdit ? updatePage : createPage}
          disabled={!pageLinks.length || !pageName}
          className={styles.submit}
        >
          {!isEdit ? 'Create' : 'Update'}
        </button>

        <button className={styles.cancel} onClick={() => navigate('/')}>
          Cancel
        </button>

      </div> :
      <></>
  )
}

export default CreatePage