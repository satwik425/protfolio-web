import React from 'react'
import Bold from './bold'

const Text = () => {
  return (
    <div className="max-w-lg">
      <p className="text-yellow-500 font-semibold text-sm tracking-wide mb-4">
        STUDENT DEVELOPER
      </p>

      <Bold />

      <p className="mt-6 text-gray-500 leading-relaxed">
        I’m a student at KIIT University with a strong interest in
        Web Development, Data Structures & Algorithms, and AI/ML.
        I enjoy building web applications and solving problems
        that strengthen my logical and technical skills.
      </p>
    </div>
  )
}

export default Text
