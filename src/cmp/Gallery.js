
import Wrapper from './Wrapper';

import Side from './Side';
import { obj } from './config'


export default function Gallery() {
    if (!localStorage.getItem('email')) {
        console.log(localStorage.getItem('email'))
        window.location.href = obj.domain;

    }
    console.log(localStorage.getItem('email'))
    return (
        <Wrapper self="center">
            <Side />

        </Wrapper>
    )
}
