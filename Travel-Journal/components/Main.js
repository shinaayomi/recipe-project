import React from 'react'

export default function Main(props) {
    return (
        <div className="card">
            <img src={props.item.imageUrl} className="card--image" />
            <div className="card-stats">
                <span className="location">{props.item.location}</span>
                <a className="url--link" href={props.item.gooleMapsUrl} >View on Google Maps</a> 
                <h2 className="title">{props.item.title}</h2>
                <span className="date">{props.item.startDate} - </span>
                <span className="date">{ props.item.endDate}</span>
                <p className="description">{props.item.description}</p>
            </div>
        </div>
    )
}