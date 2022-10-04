import React from 'react'

export default function PlayerDetails(props) {
  return (
    <div className='c-player--details'>
        <div className='details-img'>
            <img src={props.song.img_src} alt={props.song.artist}/>
        </div>
        <h3 className='details-title'>{props.song.title}</h3>
        <h4 className='datails-artist'>{props.song.artist}</h4>
    </div>
  )
}
