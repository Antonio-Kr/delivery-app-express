Работает только на локальной mongobd.
cqrs_saga_event-sourcing_express и services пользуются разными базами
cqrs_saga_event-sourcing_express записывает ивенты в базу orders_events в колекцию events
services в базу ordersdb в колекцию orders

Kafka и zookeeper запускаем вручную

С топиками какая то проблема. Они автоматом не создаются
По этому сначала запускаем cqrs_saga_event-sourcing_express проект и выполняем команду node kafkaTopicsCreator. Должно вывести "ERROR => null []" тогда все ок. Жмем ctrl + c чтобы выйти.
Дальше запускаем node app/ Это express проект
В нем есть только http://localhost:3000/ POST
Отправлять ничего в него не надо. Сам проект только моделирует поведение как ты скинул на картинке.
Следовательно через постмен обращаемся к нему, но еще рано

А насчет services заходим в каждый проект по отдельности и node app.
Теперь по единственному endpoint обращаемся через POST
