import React, { useEffect, useRef, useState } from "react";

export default function Team() {
    return (
        <div className='flex-container'>
            <div>
            <h2>Snarveier:</h2>
            <section className='flex-child-row'>
              <div>
                <h2>Tegn</h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Søk</h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Filer</h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2>Idéer</h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
            </section>

            <h2>Tegninger:</h2>
            <section className='flex-child-row'>
              <div>
                <h2></h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2></h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2></h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
              <div>
                <h2></h2>
                <img src="../src/assets/img/pfp.jpg" alt="" />
              </div>
            </section>

            <h2>Filer:</h2>
            <section className='flex-child-column'>
              <div>
                  <h3>Ny Skisse opprettet</h3>
                  <p>Ideer.svg ble lagt til i filer av [BRUKER] </p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt tekst opprettet</h3>
                  <p>tekst.pdf laget av [BRUKER]</p>
                  <button>Les Mer</button>
                </div>
            </section>

            <h2>Det nyeste:</h2>
              <section className='flex-child-column'>
                <div>
                  <h3>Nytt lag opprettet</h3>
                  <p>Navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag opprettet</h3>
                  <p>Navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag opprettet</h3>
                  <p>Navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
                <div>
                  <h3>Nytt lag opprettet</h3>
                  <p>Navn har opprettet ny gruppe med navn</p>
                  <button>Les Mer</button>
                </div>
              </section>


              <h2>Medlemmer:</h2>
              <section className='flex-child-column'>
                <h3>Leder</h3>
                <div>
                  <h2>Oskar</h2>
                </div>
                <h3>Nest-leder</h3>
                <div>
                  <h2>Jonas</h2>
                </div>
                <h3>Andre</h3>
                <div>
                  <h2>person 1</h2>
                </div>
                <div>
                  <h2>person 2</h2>
                </div>
                <div>
                  <h2>person 3</h2>
                </div>
                <div>
                  <h2>person 4</h2>
                </div>
                
              </section>
            </div>
          </div>
    );
}
