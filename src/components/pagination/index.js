import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination() {

    const cn = bem('Pagination');

    return (
        <div className={cn()}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
        </div>
    )
}

export default Pagination;