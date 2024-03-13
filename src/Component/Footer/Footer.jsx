import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-light py-5'>
        <div className="container">
            <h4>Get the Fresh Cart App</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti facilis tempora nihil aspernatur impedit unde. Dolorem nostrum vero fugit officiis.</p>
            <div className='d-flex'>
                <div className="col-sm-10">
                    <input type="text" className='form-control py-2' placeholder='Email...'/>
                </div>
                <div className="col-sm-2 ps-2">
                    <button className='btn bg-main text-white'>Share App Link</button>
                </div>
            </div>

            <div className='mt-5 py-4 border-top border-bottom'>
                Payment Partner
            </div>
        </div>

    </footer>
  )
}
