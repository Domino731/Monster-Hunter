export const getProfileHTMLCode = () : string => {
    return `
    <section class='game__section profile'>

    <div class='profile__item'>
        <div class='profile__equipment' id='profile_equipment_slots'>
            <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet'>
                <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate'>
                <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves'>
                <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon'>
                <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield'>
                <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special'>
                <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__portrait'> </div>
            <div class='profile__info'>
                <div class='profile__level'> </div>
                <strong class='profile__nickname'>nickname</strong>
            </div>
        </div>
        <div class='profile__description'>
            <textarea type="textarea" name="user-description" placeholder='Your description' maxLength="440"></textarea>
        </div>
        <a href='https://www.freepik.com/vectors/background' target="_black">Background vector created by upklyak -
            www.freepik.com</a>

    </div>

    <div class='profile__item'>
        <div class='profile__backpack'>
            <div class='profile__backpackRow'>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
            </div>
            <div class='profile__backpackRow'>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
                <div class='profile__backpackItem'> </div>
            </div>
        </div>


        <div class='profile__general'>
            <div class='profile__generalItem'>
                <div class='profile__generalImg'> <img src="/images/profile_coins.png" alt="Your coins" /></div>
                <strong class='profile__generalText'> 123123123123123</strong>
            </div>
            <div class='profile__generalItem'>
                <div class='profile__generalImg'> <img src="/images/profile_pet_slot.png" alt="Pet slot" /></div>
                <strong class='profile__generalText'> 123123123123123</strong>
            </div>
            <div class='profile__generalItem'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #1" />
                </div>
                <strong class='profile__generalText'> 123123123123123</strong>
            </div>
            <div class='profile__generalItem'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #2" />
                </div>
                <strong class='profile__generalText'> 123123123123123</strong>
            </div>
        </div>

        <div class='profile__stats'>
            <table>
                <tbody>


                    <tr>
                        <td class='profile__item--name'> <img src="/images/stats_strength.png" alt="strength" />
                            <strong>Strength</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong>123</strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                            <div>+</div>
                        </td>
                    </tr>
                    <tr>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Damage</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>




                    <tr>
                        <td class='profile__item--name'> <img src="/images/stats_runner.png" alt="physical endurance" />
                            <strong>physical endurance</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong>123</strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                            <div>+</div>
                        </td>
                    </tr>
                    <tr>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Health</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>

                    <tr>
                        <td class='profile__item--name'> <img src="/images/stats_defence.png" alt="Defence" />
                            <strong>Defence</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong>123</strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                            <div>+</div>
                        </td>
                    </tr>
                    <tr>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Damage reduce</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>

                    <tr>
                        <td class='profile__item--name'> <img src="/images/stats_clover.png" alt="Luck" />
                            <strong>Luck</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong>123</strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                            <div>+</div>
                        </td>
                    </tr>
                    <tr>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Chance for critical</strong>
                        </td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>


                </tbody>
            </table>
        </div>
    </div>


</section>
    `
}