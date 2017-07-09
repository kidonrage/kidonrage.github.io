<?php
 /* Здесь проверяется существование переменных */
  if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
 if (isset($_POST['name'])) {$name = $_POST['name'];}
  if (isset($_POST['email'])) {$email = $_POST['email'];}
  if (isset($_POST['type'])) {$type = $_POST['type'];}

/* Сюда впишите свою эл. почту */
 $address = "stroitelipitera@ya.ru";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 $mes = "Имя: $name\nТелефон: $phone";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Заказ с сайта'; //сабж
$email='stroitelipitera.ru'; // от кого
 $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=index.html');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="3; url=index.html">
<title>С Вами свяжутся</title>
<meta name="generator">
<style type="text/css">
body
{
   background: #555 url(images/thanks.jpg) top 0% center no-repeat;
}
</style>
<script type="text/javascript">
setTimeout('location.replace("/index.html")', 3000);
/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
</script> 
</head>
</body>
</html>