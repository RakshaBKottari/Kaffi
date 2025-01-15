import React from 'react'
import FooterCSS from '../css/footer.module.css'

function footer() {
  return (
    <div className={FooterCSS.footer}>
        <h1 className={FooterCSS.logo}><a href='/' className={FooterCSS.aTagLogo}>Kaffi</a></h1>
        <div className={FooterCSS.copycontainer}>
            <p className={FooterCSS.copyright}>Copyright © 2025 | All rights Reserved</p>
        </div>
    </div>
  )
}

export default footer
