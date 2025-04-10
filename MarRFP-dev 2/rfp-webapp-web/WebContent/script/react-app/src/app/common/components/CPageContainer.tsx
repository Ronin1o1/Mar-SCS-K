import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import btnPrevious from '../assets/img/button/btnPrevious.gif';
import btnNext from '../assets/img/button/btnNext.gif';
import btnUpdate from '../assets/img/btnUpdate.gif';
import styles from './CPageContainer.css';
import classnames from 'classnames';

export default function CPageContainer(props) {
    const history = useHistory();

    const btnPos = props.btnPosition === 'left' ? styles.btn_left :
        props.btnPosition === 'middle' ? styles.btn_middle : styles.btn_right;

    return (
        <Fragment>

            <div className={classnames(styles.pointer,btnPos)}>
                {props.update ? <img tabIndex={0} id='update' className={styles.pr5} src={btnUpdate} onClick={(event) => props.update(event, history)} /> : ''}
                <img tabIndex={0} id='back' className={styles.pr5} onClick={(event) => props.update(event, history)} src={btnPrevious} />
                <img tabIndex={0} id='next' src={btnNext} onClick={(event) => props.update(event, history)} />
            </div>
        </Fragment>
    )
}
