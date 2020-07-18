import React, { useState, useEffect } from 'react';
import {Doughnut} from 'react-chartjs-2';

const Chart = ({ stuff }) => {

    const [ framework, setFramework ] = useState(0);
    const [ component, setComponent ] = useState(0);
    const [ software, setSoftware ] = useState(0);
    const [ other, setOther ] = useState(0);
    const [ library, setLibrary ] = useState(0);

    useEffect(() => {
        setFramework(stuff.filter((s) => s.category === 'Framework'))
        setComponent(stuff.filter((s) => s.category === 'Composant'))
        setSoftware(stuff.filter((s) => s.category === 'Software'))
        setOther(stuff.filter((s) => s.category === 'Autre'))
        setLibrary(stuff.filter((s) => s.category === 'Librairie'))
    }, [stuff])

    const data = {
        labels: [
            'Frameworks',
            'Librairies',
            'Composants',
            'Software',
            'Autre'
        ],
        datasets: [{
            data: [framework.length, library.length, component.length, software.length, other.length],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#9370DB',
            '#4fddae'
            ]
        }]
    };

    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
}

export default Chart;
