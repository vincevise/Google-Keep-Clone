import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import {useOnDraw} from './Hooks';

type Props = {
    canvasRef: MutableRefObject<any>
    stroke: {color:string, size: number}
    setStroke: Dispatch<SetStateAction<{color:string, size: number}>>
    isErasing: boolean
    setisErasing: Dispatch<SetStateAction<boolean>>
}



const Canvas = ({
    canvasRef,
    stroke,
    isErasing
}:Props) => {

    const {
        setCanvasRef,
        onCanvasMouseDown,
    } = useOnDraw(onDraw);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Use useEffect to wait until after the component mounts to access window
    useEffect(() => {
        // Set dimensions only when window is available
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    function onDraw(ctx: any, point: any, prevPoint: any) {
        drawLine(
            prevPoint, 
            point, 
            ctx, 
            isErasing ? 'white' : stroke.color, 
            stroke.size
        );
    }



    
    function drawLine(
        start: any,
        end: any,
        ctx:any,
        color: string,
        width: number
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();

    }


    

    
    

    return(
        <div className='w-fit h-fit  relative mt-12 mx-0'>
            <canvas
                className='bg-white'
                height={dimensions.height - 52}
                width={dimensions.width}
                onMouseDown={onCanvasMouseDown}
                ref={(ref: any)=>{
                    setCanvasRef(ref as any);  
                    canvasRef.current = ref
                }}
            />
           
        </div>
    );

}

export default Canvas;

 