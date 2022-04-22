import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingOverlay(props) {
  const visible = props.visible || false

  return (
    <motion.div
      className="loading-overlay"
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        visible: {
          opacity: 1,
          display: 'flex'
        },
        hidden: {
          opacity: 0,
          transitionEnd: {
            display: 'none',
          },
        },
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="spinner-container"
        animate={visible ? 'visible' : 'hidden'}
        variants={{
          visible: { scale: 1 },
          hidden: { scale: 0 },
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="spinner-2"></div>
      </motion.div>
    </motion.div>
  )
}