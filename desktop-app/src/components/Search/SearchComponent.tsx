import styles from '../../styles/Search.module.scss';
import {SearchComponentProps} from './SearchComponentProps';

function SearchComponent(props:SearchComponentProps): JSX.Element {

    function onChange (e:any):void {
        props.onChange(e.target.value);
    }

    return (<input placeholder="Szukaj" className={styles.main} onChange={onChange}/>);
}

export default SearchComponent;
