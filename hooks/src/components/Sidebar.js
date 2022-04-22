import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import TypographyLogo from '@/assets/svg/typography_logo.svg'

export default function Sidebar() {
    const location = useLocation()

    useEffect(() => {
        window.feather.replace()
    }, [])

    function sidebarMenuLink(name, url, icon) {
        return (
            <li className={classNames({
                'is-active': isCurrentUrl(url)
            })}>
                <Link to={url}>
                    {(icon) ? (
                        <div className="svg svg--height sidebar__menu-icon">
                            <i data-feather={icon}></i>
                        </div>
                    ) : null}
                    {name}
                </Link>
            </li>
        )
    }

    function isCurrentUrl(url) {
        const pathname = location.pathname

        if (pathname === url) {
            return true
        }

        if (url.length > 1) {
            url = url.replace('/', '\/')

            const regex = new RegExp('^' + url)

            return pathname.match(regex)
        }
    }

    return (
        <nav className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__header">
                    <div className="sidebar__autoescola">
                        <p>Autoescola Magnum Fazendinha</p>
                    </div>
                </div>

                <ul className="sidebar__menu">
                    {sidebarMenuLink('Início', '/', 'home')}
                    {sidebarMenuLink('Alunos', '/alunos', 'user')}
                    {sidebarMenuLink('Aulas', '/aulas', 'calendar')}
                    {sidebarMenuLink('Exames', '/exames', 'check-circle')}
                    {sidebarMenuLink('Materiais', '/materiais', 'book')}
                    {sidebarMenuLink('Serviços', '/servicos', 'shopping-bag')}
                    {sidebarMenuLink('Pacotes', '/pacotes', 'package')}
                </ul>
            </div>

            <div className="sidebar__bottom">
                <div className="sidebar__footer">
                    <div className="svg svg--height sidebar__logo">
                        <TypographyLogo/>
                    </div>
                </div>
            </div>
        </nav>
    )
}