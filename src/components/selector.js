function selector ({id}, pads) {
    let newPads = pads.map(pad => {
            if (pad.id === id) {
                switch (pad.selected) {
                    case false: 
                        return {
                            ...pad,
                            selected: true
                        }
                    case true: 
                        return {
                            ...pad,
                            selected: false
                        }   
                    default: 
                        return {...pad};  
                }
            } else {
                return pad;
            }
        })
    return newPads;
}

export {selector};