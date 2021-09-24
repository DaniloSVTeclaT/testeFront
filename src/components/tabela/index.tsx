import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
    Children,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container } from './styles'

const Input: React.FC = ({ children }) => {
    const inputRef = useRef<HTMLInputElement>(null);



    return (
        <Container>
            <table>
                
                {children}
            </table>
        </Container>
    );
};

export default Input;
