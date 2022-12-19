const select_pet = document.getElementById('select_pet')
const pet_cards = document.getElementById('pet_cards')
const input_pets = document.getElementsByName('pet')
const btn_select_pet = document.getElementById('btn_select_pet')

const select_attack = document.getElementById('select_attack')
const attack_buttons = document.getElementById('attack_buttons')
const attacks = document.getElementsByClassName('btn_attack')
const messages = document.getElementById('messages')
const message = document.getElementById('message')
const btn_restart = document.getElementById('btn_restart')

const p_player_lives = document.getElementById('p_player_lives')
const p_enemy_lives = document.getElementById('p_enemy_lives')
const player_logo = document.getElementById('player_logo')
const enemy_logo = document.getElementById('enemy_logo')
const p_player_pet = document.getElementById('p_player_pet')
const p_enemy_pet = document.getElementById('p_enemy_pet')
const history_player = document.getElementById('history_player')
const history_enemy = document.getElementById('history_enemy')

const lt_mokepones = [], dict_mokepones = new Map()
const real_p_attacks = new Map(), real_e_attacks = new Map() 
var player, enemy, player_i, enemy_i
var player_lives, enemy_lives, player_attacks, enemy_attacks
var p_attack, e_attack, player_attack, enemy_attack

window.addEventListener('load', loadGame)

function loadGame(){
    select_attack.style.display = 'none'
    messages.style.display = 'none'
    btn_restart.style.display = 'none'
    loadData()

    lt_mokepones.forEach((mokepon) => {
        pet = `<input type='radio' name='pet' id=${mokepon.name}>
                <label class='pet_card' for=${mokepon.name}>
                    <p>${mokepon.name} ${mokepon.type}</p>
                    <img src=${mokepon.image} alt=${mokepon.name}>
                </label>`
        pet_cards.innerHTML += pet
        dict_mokepones.set(mokepon.name, mokepon)
    })

    btn_select_pet.addEventListener('click', selectPets)
}

function selectPets(){
    for(pet of input_pets){
        if (pet.checked){
            player = pet.id, enemy = input_pets[random(0, input_pets.length - 1)].id
            player_i = dict_mokepones.get(player), enemy_i = dict_mokepones.get(enemy)
            player_lives = player_i.lives, enemy_lives = enemy_i.lives
            player_attacks = player_i.attacks, enemy_attacks = enemy_i.attacks
            putInfo()

            select_pet.style.display = 'none'
            select_attack.style.display = 'flex'
            messages.style.display = 'flex'

            for(attack of attacks){
                attack.addEventListener('click', fight)
            }
        }
    }
}

function putInfo(){
    player_attacks.forEach((attack) => {
        attack_buttons.innerHTML += `<button id=${attack.id} class='btn_attack'>${attack.name}</button>`
        real_p_attacks.set(attack.name, attack.real_name)
    })
    enemy_attacks.forEach((attack) => {real_e_attacks.set(attack.name, attack.real_name)})
    
    p_player_lives.innerHTML = player_lives
    p_enemy_lives.innerHTML = enemy_lives
    p_player_pet.innerHTML = `${player} ${player_i.type}`
    p_enemy_pet.innerHTML = `${enemy} ${enemy_i.type}` 
    player_logo.src = `assets/${player}.svg`, player_logo.alt = player
    enemy_logo.src = `assets/${enemy}.svg`, enemy_logo.alt = enemy
}

function fight(event){
    p_attack = event.target.innerHTML
    e_attack = enemy_attacks[random(0, enemy_attacks.length - 1)].name
    player_attack = real_p_attacks.get(p_attack), enemy_attack = real_e_attacks.get(e_attack)
    console.log(player_attack, enemy_attack)

    if ((player_attack == enemy_attack)){
        result = `It's a tie!`
    } else if ((player_attack == 'Fire 🔥' && enemy_attack == 'Soil 🌱') || 
    (player_attack == 'Water 💧' && enemy_attack == 'Fire 🔥') || 
    (player_attack == 'Soil 🌱' && enemy_attack == 'Water 💧')){
        result = `You win!`
        enemy_lives--
        p_enemy_lives.innerHTML = enemy_lives
    } else {
        result = `You've lost!`
        player_lives--
        p_player_lives.innerHTML = player_lives
    }

    createMessage(result)
    checkLives()
}    

function createMessage(result){
    new_player_a = document.createElement('p')
    new_enemy_a = document.createElement('p')

    message.innerHTML = result
    new_player_a.innerHTML = p_attack
    new_enemy_a.innerHTML = e_attack
    
    history_player.appendChild(new_player_a)
    history_enemy.appendChild(new_enemy_a)
    history_player.scrollTop = history_player.scrollHeight
    history_enemy.scrollTop = history_enemy.scrollHeight
}

function checkLives(){
    if (enemy_lives == 0){
        end_game(`Good game! YOU WIN! 🎉🎉`)
    } else if (player_lives == 0){
        end_game(`Oh! GAME OVER! 🎮👾`)
    }
}

function end_game(final){
    message.innerHTML = final

    for(attack of attacks){
        attack.disabled = true
    }

    btn_restart.style.display = 'block'
    btn_restart.addEventListener('click', reload)
}

function reload(){
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function loadData(){
    class Mokepon {
        constructor (name, type, attacks, lives) {
            this.name = name
            this.type = type
            this.attacks = attacks
            this.image = `assets/${name}.svg`
            this.lives = lives
        }
    }

    let cattie_attacks = [{'name':'Ball 🧶', 'id':'btn_ball', 'real_name':'Fire 🔥'},
                        {'name':'Fish 🐟', 'id':'btn_fish', 'real_name':'Fire 🔥'},
                        {'name':'Fire 🔥', 'id':'btn_fire', 'real_name':'Fire 🔥'},
                        {'name':'Water 💧', 'id':'btn_water', 'real_name':'Water 💧'},
                        {'name':'Soil 🌱', 'id':'btn_soil', 'real_name':'Soil 🌱'}]

    let doggito_attacks = [{'name':'Bone 🦴', 'id':'btn_bone', 'real_name':'Water 💧'},
                        {'name':'Bark 🐶', 'id':'btn_bark', 'real_name':'Water 💧'},
                        {'name':'Fire 🔥', 'id':'btn_fire', 'real_name':'Fire 🔥'},
                        {'name':'Water 💧', 'id':'btn_water', 'real_name':'Water 💧'},
                        {'name':'Soil 🌱', 'id':'btn_soil', 'real_name':'Soil 🌱'}]

    let lapinette_attacks = [{'name':'Carrot 🥕', 'id':'btn_carrot', 'real_name':'Soil 🌱'},
                        {'name':'Teeth 🦷', 'id':'btn_teeth', 'real_name':'Soil 🌱'},
                        {'name':'Fire 🔥', 'id':'btn_fire', 'real_name':'Fire 🔥'},
                        {'name':'Water 💧', 'id':'btn_water', 'real_name':'Water 💧'},
                        {'name':'Soil 🌱', 'id':'btn_soil', 'real_name':'Soil 🌱'}]

    let cattie = new Mokepon('Cattie', '🔥', cattie_attacks, 4)
    let doggito = new Mokepon('Doggito', '💧', doggito_attacks, 4)
    let lapinette = new Mokepon('Lapinette', '🌱', lapinette_attacks, 4)
    lt_mokepones.push(cattie, doggito, lapinette)
}