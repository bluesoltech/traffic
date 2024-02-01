import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'
import logo from '../assets/img/logo.png'
import { useCountries } from "use-react-countries";
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const Form = () => {

    return (
        <>
            <div className="bg-gradient-to-r to-full from-yellow-500 via-orange-100 to-green-600 p-8 flex flex-col md:flex-row items-center md:justify-between text-black">
                <div className="flex items-center mb-4 md:mb-0 md:mr-4">
                    <img src={logo} alt="Logo" className="h-14 mr-2" />
                    <span className="text-lg font-bold">Registration Form</span>
                </div>
            </div>

            <form>
                <div>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                </div>
                
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Form