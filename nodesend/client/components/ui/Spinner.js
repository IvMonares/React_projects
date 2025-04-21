import React from "react";
import styles from "../../styles/spinner.module.css";

const Spinner = () => (
    <div className={`spinner ${styles.sk_folding_cube}`}>
        <div className={`spinner ${styles.sk_cube}`}></div>
        <div className={`spinner ${styles.sk_cube2} ${styles.sk_cube}`}></div>
        <div className={`spinner ${styles.sk_cube4} ${styles.sk_cube}`}></div>
        <div className={`spinner ${styles.sk_cube3} ${styles.sk_cube}`}></div>
    </div>
);

export default Spinner;
