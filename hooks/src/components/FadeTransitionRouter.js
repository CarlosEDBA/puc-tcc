import React, { useState, useEffect } from 'react'
import { Router, Location } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { BASEPATH } from '@/globals'

export default function FadeTransitionRouter(props) {
  return (
    <Location>
      {({ location }) => (
        <TransitionGroup className="transition-group">
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            {/* the only difference between a router animation and
                any other animation is that you have to pass the
                location to the router so the old screen renders
                the "old location" */}
            <Router basepath={BASEPATH} location={location} className="router">
              {props.children}
            </Router>
          </CSSTransition>
        </TransitionGroup>
      )}
    </Location>
  )
}

