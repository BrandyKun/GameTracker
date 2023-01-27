import React from 'react'

const HomeInfo = () => {
  return (
    <section className="section-about">
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Create a list</h2>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <h3 className="heading-tertiary u-margin-bottom-small">
                save ytour favourite games
              </h3>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate eius eveniet, sit perferendis possimus iure laudantium
                obcaecati quisquam quos optio!
              </p>
              <h3 className="heading-tertiary u-margin-bottom-small">
                leave reviews
              </h3>
              <p className="paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti odit quis nihil, minus asperiores, dolorum omnis ad
                nisi quod ex recusandae suscipit rerum quia facere.
              </p>

              <a href="#" className="btn-text">
                Learn more &rarr;
              </a>
            </div>
            <div className="col-1-of-2">
              <div className="composition">
                <img
                  src="https://blog.playstation.com/uploads/2022/12/a90bb22a521f0155b762c59d63e618829ea26cd2.jpeg"
                  alt="photo 1"
                  className="composition__photo composition__photo--p1"
                />
                <img
                  src="https://assets-prd.ignimgs.com/2022/01/21/spiderman2ps-sq-1642799668042.jpg"
                  alt="photo 2"
                  className="composition__photo composition__photo--p2"
                />
                <img
                  src="https://cdn-hogwartslegacy.warnerbrosgames.com/retail/standard/en/pack.jpg"
                  alt="photo 3"
                  className="composition__photo composition__photo--p3"
                />
              </div>
            </div>
          </div>
        </section>
  )
}

export default HomeInfo