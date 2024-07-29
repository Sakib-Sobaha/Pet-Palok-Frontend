import React from 'react';



const LostPost = () => {
    // Your code here

    return (
        <div className="w-full m-2 p-1">
            <div className="card bordered">
                <figure>
                    <img src="https://source.unsplash.com/random/800x600" alt="random" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Lost Post</h2>
                    <p>
                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
                        purus ut nunc euismod tincidunt. Nullam nec purus ut nunc euismod tincidunt.
                    </p>
                    <p>
                        Location: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
                        purus ut nunc euismod tincidunt. Nullam nec purus ut nunc euismod tincidunt.
                    </p>
                    <p>
                        Date: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
                        purus ut nunc euismod tincidunt. Nullam nec purus ut nunc euismod tincidunt.
                    </p>
                    <p>
                        Contact: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
                        purus ut nunc euismod tincidunt. Nullam nec purus ut nunc euismod tincidunt.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LostPost;