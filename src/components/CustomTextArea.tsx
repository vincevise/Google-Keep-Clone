import React, { useEffect, useRef, useState } from 'react'

type Props = {
    content: string
}

const CustomTextArea = ({content}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Resetting the height to recalculate the height based on the content
      textareaRef.current.style.height = 'auto';
      // Setting the new height based on the scrollHeight
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  return (
    <textarea className="bg-transparent resize-none cursor-default	outline-none border-none h-fit" readOnly name="" id=""  value={content ?? ''} ref={textareaRef}/>
  )
}

export default CustomTextArea