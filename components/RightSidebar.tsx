import React from 'react'

import { useRef } from 'react'
import { fabric } from 'fabric'
import Dimensions from './settings/Dimesions'
import Text from './settings/Text'
import Color from './settings/Color'
import Export from './settings/Export'
import { RightSidebarProps } from '@/types/type'
import { modifyShape } from '@/lib/shapes'



const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage
}:RightSidebarProps) => {

  const colorInputRef= useRef(null);
  const strokeInputRef= useRef(null);


  const handleInputChange =(property:string,value:string)=>{
    if( !isEditingRef.current)  isEditingRef.current=true;

    setElementAttributes((prev)=>({
      ...prev,[property]:value
    }))

    modifyShape({
      canvas:fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage
    })
  }
  

  return (
    <section className='flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20'>
      <h3 className='px-4 pt-4 text-xs uppercase'>Design</h3>
      <span className='text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4 '>Make changes to your canvas as you like</span>
      <Dimensions 
        isEditingRef={isEditingRef}
        width={elementAttributes.width} 
        height={elementAttributes.height}
        handleInputChange={handleInputChange}
      />
      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        attributeType='fill'
        placeholder="color"
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        attributeType='stroke'
        placeholder="stroke"
        handleInputChange={handleInputChange}
      />
      
      <Export/>
    </section>
  )
}

export default RightSidebar
