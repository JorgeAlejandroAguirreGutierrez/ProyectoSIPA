<?php

/**
 *
 * @author Carlos
 */
interface Persistible {

    function add($argumentos);

    function edit($argumentos);

    function del($argumentos);

    function select($argumentos);

}
?>
