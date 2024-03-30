import { useEffect, useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { MdSave } from "react-icons/md";
import Canvas from '@/components/DrawingApp/Canvas';
import { EraseButton } from '@/components/DrawingApp/EraseButton';
import { DrawButton } from '@/components/DrawingApp/DrawButton';
import { dataUrlToBuffer, getImageURL, getS3Object, uploadFile } from '@/lib/aws-s3';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { v4 } from 'uuid';

// function isCanvasEmpty(canvas: any) {
//     const context = canvas.getContext('2d');
//     const pixelBuffer = new Uint32Array(
//       context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
//     );
  
//     // Check if there's any pixel with a non-zero value (indicating it's not empty)
//     return !pixelBuffer.some(color => color !== 0);
// }

function App() {

  const canvasRef = useRef<any>(null);

  const [stroke, setStroke] = useState({color:'black', size: 10})
  const [isErasing, setisErasing] = useState(false) 
  const router = useRouter()
  const { data , isLoading, error} = api.note.getNoteById.useQuery({id:Number(router.query.id)} , {enabled:router.query.id ? true : false})

  const {mutate:addDrawing} = api.note.AddDrawing.useMutation()


  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'my-canvas-image.png';
        link.href = image;
        document.body.appendChild(link); // This line is needed for Firefox
        link.click();
        document.body.removeChild(link); // Clean up
    }
  };

  const saveDrawing =async () => {
    try {
       
        const canvas = canvasRef.current; 
        canvas.crossOrigin = 'anonymous'
        const dataURL = canvas.toDataURL("image/png");
        
        if (canvas ) {

          if(data && data.id){
            const filename = data.drawing ? data.drawing : `${v4()}.png`
            const response = await uploadFile(dataURL, filename);
            addDrawing({drawing:filename, noteId: data.id})
          }
        }

        router.back()
    } catch (error) {
        console.log(error, 'error')
    }
  };

  const loadDrawing = async() => {
    if(data && data.drawing ){

      const response = await getImageURL(data.drawing);
      console.log(response, )
      if(response ){
  
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const dataURL = response
          if (canvas && dataURL) {
              const img = new Image();
              img.crossOrigin = "anonymous";

              img.onload = function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
                  ctx.drawImage(img, 0, 0); // Draw the saved image
              };
              img.src = dataURL;
          }
      }
    }
  };

 
   
  useEffect(() => {
    // A slight delay to ensure canvas is ready
    console.log(router.query.id, 'router.query.id')
    const timer = setTimeout(() => {
      loadDrawing();
    }, 100); // Adjust time as necessary, but keep it minimal
  
    return () => clearTimeout(timer);
  }, [data]); // Make sure to include correct dependencies if any

  const clearCanvas = () => {
    if(canvasRef.current){
        const canvas = canvasRef.current;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
};
  

  return (
    <>
      <div className='overflow-x-hidden relative '>
        <div className='h-12 w-full py-2 px-4 flex items-center justify-between  bg-white z-10 drop-shadow-md fixed inset-0'>
          <div className='flex items-center gap-2'>
            <button onClick={saveDrawing}>
              <IoArrowBack className='w-6 h-6 text-gray-600 mr-4'/>
            </button>
            <EraseButton 
                stroke={stroke} 
                setStroke={setStroke} 
                setisErasing={setisErasing}
                clearCanvas={clearCanvas}
            />
            <DrawButton
                stroke={stroke}
                setStroke={setStroke}
                setisErasing={setisErasing}
            />
            {/* <button className='p-2 bg-gray-100' onClick={()=>setColor('white')}>
              <FaEraser className='w-4 h-4 text-gray-600'/>
            </button>
            <button className='p-2 bg-gray-100' >
              <HiPencil className='w-4 h-4 text-gray-600' onClick={()=>setColor('black')}/>
            </button> */}
          </div>

          <button className='p-2 bg-gray-100' >
            <MdSave className='w-4 h-4 text-gray-600' onClick={saveImage}/>
          </button>

        </div>
        <Canvas 
            canvasRef={canvasRef} 
            stroke={stroke} 
            setStroke={setStroke}
            isErasing={isErasing}
            setisErasing={setisErasing}
        />
      </div>
    </>
  )
}

export default App