import { React } from 'react';
import './LinkComponent.css';

function LinkComponent( { url, className, text } ) {

  return (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer">{text}</a>
  )
}

export default LinkComponent;