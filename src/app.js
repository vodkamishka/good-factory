import React, {useState} from 'react';
import SidebarMenu from "./sidebar-menu";

const App = () => {
    const [currentSection] = useState(2);

    const sidebar = [
        {labels: {indexFile: '1'}, files: [{folder: 'apple', indexFile: 56}, '5', '6'], section: 3, indexFile: 56, name: 'Andrey', folder: 'fruit'},
        {labels: {indexFile: '1'}, files: ['2', '5', '6'], section: 3, indexFile: 56, name: 'Boris', folder: 'fruit'},
        {labels: {indexFile: '1'}, files: ['2', '5', '6'], section: 3, indexFile: 56, name: 'Igor', folder: 'fruit'}
    ];

    const getLinkHref = index => index

    return (
        <div>
            <SidebarMenu currentSection={currentSection} sidebar={sidebar} getLinkHref={getLinkHref}/>
        </div>
    );
};

export default App;