import React from 'react';

export default function Dashbord() {
  return (
    <>
        <h1>Dashbord</h1>
          <div className='flex-container'>
            <div>
              <h2>Det nyeste:</h2>
              <section className='flex-child-column'>
                <div>
                  <h3>Nytt lag oprettet</h3>
                  <p>navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag oprettet</h3>
                  <p>navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag oprettet</h3>
                  <p>navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag oprettet</h3>
                  <p>navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
              </section>
            </div>  
            <div>
            <h2>Snarveier:</h2>
            <section className='flex-child-row'>
              <div>
                <h2>Team</h2>
                <img src="../src/app/pages/components/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Søk</h2>
                <img src="../src/app/pages/components/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Filer</h2>
                <img src="../src/app/pages/components/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Ideér</h2>
                <img src="../src/app/pages/components/pfp.jpg" alt="" />
              </div>
              
            </section>
            </div>
          </div>
    </>
  );
}
