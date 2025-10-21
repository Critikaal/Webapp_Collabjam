import React from 'react';

export default function Dashbord() {
  return (
    <>
        <h1>Dashbord</h1>
          <div className='flex-container'>
            <div>
              <h2>Det nyeste:</h2>
              <section>
               <h3>Nytt lag oprettet</h3>
               <p>navn har opprettet ny gruppe med navn</p>
               <button>les mer</button>
               <h3>Nytt lag oprettet</h3>
               <p>navn har opprettet ny gruppe med navn</p>
               <button>les mer</button>
               <h3>Nytt lag oprettet</h3>
               <p>navn har opprettet ny gruppe med navn</p>
               <button>les mer</button>
               <h3>Nytt lag oprettet</h3>
               <p>navn har opprettet ny gruppe med navn</p>
               <button>les mer</button>
            </section>
            </div>  
            <div>
            <h2>Snarveier:</h2>
            <section>
              <img src="../src/assets/img/pfp.jpg" alt="" />
            </section>
            </div>
          </div>
    </>
  );
}
