import React, {useState} from 'react';
import styles from "../Users.module.css";
import cn from "classnames";

export const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    // Число порций = округлить вверх(Число страниц / размер порции)
    let portionCount = Math.ceil(pagesCount / portionSize);

    // Хук, номер порции = 1, установить номер порции 1
    let [portionNumber, setPortionNumber] = useState(1);

    //номер левой границы порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;

    //номер правой границы порции
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        <div className={styles.firstButton}>
        { portionNumber > 1 && pages.filter(p => p === 1)
            .map(p => {
                return <div className={styles.sizeButton} key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                                 setPortionNumber(1)
                             }}>В начало</div>
            })
        }
        </div>
        <div className={styles.button}>
            {portionNumber > 1 && <button onClick={() => { //Если номер порции больше 1 показать кнопку Previous
            setPortionNumber(portionNumber - 1)
        }}>&#8656;</button>}
        </div>

        <div className={styles.numbers}>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber) //отфильтровать номера страниц, которые больше номера левой границы и меньше номера правой границы порции
                .map(p => {
                    return <div className={cn({
                        [styles.selectedPage]: currentPage === p
                    }, styles.pageNumber)} key={p}
                                onClick={(e) => {
                                    onPageChanged(p)
                                }}>{p}</div>
                })}
        </div>

        <div className={styles.button}>
        {portionCount > portionNumber && <button onClick={() => { //Если количество порций больше номера порции показать кнопку Next
            setPortionNumber(portionNumber + 1)
        }}>&#8658;</button>}
        </div>


        { portionCount > portionNumber && pages
            .filter(p => p === (pagesCount))
            .map(p => {
                return <div className={styles.sizeButton} key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                                 setPortionNumber(portionCount)
                             }}>В конец</div>
            })
        }
    </div>
}