import React from 'react'

export default function Error(props) {
    return (
        <div>
            <div className="alert alert-warning m-6" role="alert">
                {props.message ? props.message : "Something went wrong."}
            </div>
        </div>
    )
}
