"use client";
import Image from "next/image";
import { memo } from "react";
import { NavbarProps } from '@/types/type'
import React from 'react'
import ActiveUsers from "./users/ActiveUsers";
import { navElements } from "@/constants";
import ShapesMenu from "./ShapesMenu";
import { NewThread } from "./comments/NewThread";
import {Button} from "./ui/button"
import { ActiveElement } from "@/types/type";



const Navbar = ({activeElement,imageInputRef,handleImageUpload, handleActiveElement}: NavbarProps) => {
    console.log('hello ji ')

    const isActive=(value:string | Array<ActiveElement>)=>
        (activeElement && activeElement.value===value)||
        (Array.isArray(value) && value.some((val)=> val?.value===activeElement?.value));

    console.log(isActive);
     return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
        <Image src="/favicon.ico" alt="figpro Logo" width={58} height={20}/>
        <ul className="flex flex-row">
            {navElements.map((item:ActiveElement | any)=>(
                <li
                key ={item.name}
                onClick={()=>{
                    if(Array.isArray(item.value)) return;
                    handleActiveElement(item);
                }}
                className={`group px-2.5 py-5 flex justify-center items-center ${isActive(item.value) ?"bg-primary-green":"hover:bg-primary-grey-200"}`}
                >   
                {Array.isArray(item.value)?(
                    <ShapesMenu 
                      item={item}
                      activeElement={activeElement}
                      imageInputRef={imageInputRef}
                      handleActiveElement={handleActiveElement}
                      handleImageUpload={handleImageUpload}                    
                    />
                ) : item?.value==='comments'?(
                    <NewThread>
                        <Button className="relative w-5 h-5 object-contain">
                            <Image
                                src={item.icon}
                                alt={item.name}
                                fill
                                className={isActive(item.value)?"invert":""}
                            />
                        </Button>

                    </NewThread>
                ):(
                    <button className="relative w-5 h-5 object-contain">
                        <Image
                            src={item.icon}
                            alt={item.name}
                            fill 
                            className={isActive(item.value)?"invert":""}
                        />

                    </button>
                )}

                </li>
            ))}
        </ul>
        <ActiveUsers/>
    </nav>
  );
};

export default memo(Navbar , (prevProps,nextProps)=>prevProps.activeElement===nextProps.activeElement);
