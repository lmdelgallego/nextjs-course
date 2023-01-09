import Image from 'next/image'

import classes from './hero.module.css'

function Hero() {
  return <section className={classes.hero}>
    <div className={classes.image}>
      <Image src='/images/site/me.jpg' alt='An image showing Luis Miguel' width={300} height={300} />
    </div>
    <h1>Hi, I'm Luis Miguel</h1>
    <p>I blog about web development - especially frontend frameworks like Angular, React or Vue</p>
  </section>
}

export default Hero;