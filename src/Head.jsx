
import React from 'react'
import './Head.css';

export default function Header() {
    const img = 'imageP.png'
    return (
        <div className='HH'>
            <img src={img} height={140} width={387} />
            <div className=" Search ">
                <form>
                    <label>
                        <input type="text" />
                    </label>
                </form>
            </div>
            <button> Search</button>
        </div>
    );
}
