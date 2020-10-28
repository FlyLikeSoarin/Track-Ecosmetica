import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Barcode from '../../assets/svg/barcode.svg';

export default function BarcodeImage(){
    return(
        <SvgXml width="200" height="200" xml={Barcode} />
    )
} 