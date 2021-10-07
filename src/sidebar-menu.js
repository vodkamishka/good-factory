import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import {startCase} from 'lodash';
import Preloader from './preloader';

const SidebarMenu = ({currentSection, sidebar, currentFile, onSectionSelect, getLinkHref}) => {

    const [state, setState] = useState({
        names: {},
        loading: true
    })

    const [classCollapse, setClassCollapse] = useState(sidebar.map(el => el.colapse = ''));

    const {names, loading} = state;

    useEffect(() => {
            getNameArr();
            collapse();
    }, [currentSection, currentFile])


    const collapse = () => {
        const timer = setTimeout(() => {
            const fn = (el, index) => index === currentSection ? 'slideDown' : 'slideUp';
            setClassCollapse(classCollapse.map(fn));
        }, 2000)

        clearTimeout(timer);
    }

    const getNameArr = () => {
        let arr = {}
        sidebar.forEach(section => {
            section.files.forEach(file => {
                if (file.files && file.files.length > 0) {
                    file.files.forEach(file2 => {
                        const folder = file.folder ? file.folder : section.folder;
                        const filename = file2;
                        arr[folder + '/' + filename] = startCase(filename.slice(0, -3))
                    })
                }
            })
        })

        setState({...state, names: arr, loading: false})
    }

    const getName = (labels = null, files = null, folder = null, indexFile = null) => {
        let name;
        if (labels && labels[indexFile]) {
            name = labels[indexFile]
        } else {
            name = names[folder + '/' + indexFile]
        }
        return name
    }

    const includes = (array, folder) => {
        let flag = false
        array.forEach(elem => {
            if (folder + '/' + elem === currentFile) {
                flag = true
            }
        })
        return flag
    }


    return !loading ? (
            <Menu id="sidebar-menu">
                <Sections>
                    <SectionLinks>
                        {sidebar.map((section, index) => {
                            const isSectionActive = currentSection === index;
                            let sectionTitle = section.name ? section.name :
                                getName(section.labels, section.files, section.folder, section.indexFile)
                            return (
                                <div key={index}>
                                    <SectionLink
                                        level={1}
                                        href={getLinkHref(index)}
                                        onClick={e => onSectionSelect(e, index)}
                                        className={isSectionActive ? 'docSearch-lvl0' : ''}
                                    >
                                        {sectionTitle}
                                    </SectionLink>
                                    <Collapse className={classCollapse[index]}>
                                        {section.files &&
                                            section.files.map((file, fileIndex) => {
                                                const subgroup = file.files ? file.files : null
                                                let compare = file.folder && file.indexFile ? file.folder + '/' + file.indexFile : section.folder + '/' + file;
                                                const isFileActive = currentFile === compare;
                                                let FileOrSubsectionTitle = file.name
                                                    ? file.name
                                                    : getName(section.labels, section.files, file.folder ? file.folder : section.folder, file.indexFile ? file.indexFile : file)
                                                return (
                                                    <Fragment key = {`file-${fileIndex}`}>

                                                            {subgroup &&
                                                                <Collapse>
                                                                    data-flag={'first'}
                                                                    data-open={isFileActive || includes(subgroup, file.folder ? file.folder : section.folder) ? 'true' : 'false'}
                                                                </Collapse>
                                                            }

                                                    </Fragment>
                                                )
                                            }
                                        )}
                                </Collapse>
                            </div>)
                        })}
                    </SectionLinks>

                </Sections>
            </Menu>
    ) : (
        <Menu id="sidebar-menu">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    margin: '44px 34px 0 0'
                }}
            >
                <Preloader/>
            </div>
        </Menu>
    )


};
const Menu=styled.div`
    postion: sticky;
    top: 60px;
    width: 100%;
    height: calc(100vh - 138px);
    owerflow-y: auto;
`
const Sections = styled.div`
  margin-bottom: 25px;
  margin-top: 10px;
  min-width: 280px;
`
const SectionLinks = styled.div`
  @media (max-width: 768px) {
    position: relative;
  }
`
const SectionLink = styled.a`
  display: block;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #b0b8c5;
  }
  ${props =>
    props.level === 1 &&
    `
    margin-left: 5px;
  `} ${props =>
    props.level === 2 &&
    `
    margin-left: 30px;
  `};
  ${props =>
    props.level === 3 &&
    `
    margin-left: 45px;
  `};
  ${props =>
    props.isActive &&
    `
    color: #40364d;
	`};
`
const Collapse = styled.div`
  display: none;
`
const SideFooter = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
`

export default SidebarMenu;