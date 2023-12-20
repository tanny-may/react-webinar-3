import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment({}) {
    const cn = bem('Comment');
    return(
        <div className={cn()}>
            <div className={cn('header')}>
                <span className={cn('user')}>User №1</span>
                <span className={cn('data')}>20 декабря 2023 в 10:05</span>
            </div>
            <span className={cn('text')}>Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. </span>
            <button className={cn('button')}>Ответить</button>
        </div>
    )
}

export default Comment;
