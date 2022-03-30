import styles from './styles.module.css';
import { MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { db } from '../../shared/service/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

function DashboardLink({ page }) {
    const navigate = useNavigate()

    const viewPage = () => window.open(`/page/${page.id}`);
    const editPage = () => navigate(`/edit-page/${page.id}`);
    const deletePage = () => {
        if (window.confirm(`Are you sure you want to delete ${page.name}?`)) {
            deleteDoc(doc(db, "linkPages", page.id))
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}>{page.name}</div>

            <div onClick={viewPage} className={styles.view}>
                <MdVisibility />
            </div>
            <div onClick={editPage} className={styles.edit}>
                <MdEdit />
            </div>
            <div onClick={deletePage} className={styles.delete}>
                <MdDelete />
            </div>
        </div>
    )
}

export default DashboardLink